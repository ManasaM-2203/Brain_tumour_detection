from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io, base64
import torch
import torch.nn.functional as F
import torchvision.transforms as transforms
from model_utils import load_segmentation_model, load_classification_model
import numpy as np
import matplotlib.pyplot as plt

app = FastAPI()

# ---------------------------
# Allow frontend access
# ---------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Config
# ---------------------------
device = "cuda" if torch.cuda.is_available() else "cpu"
class_names = ["glioma", "meningioma", "no_tumor", "pituitary"]

# ---------------------------
# Load models
# ---------------------------
seg_model_path = "models/unet_resnet34_segmentation.pth"
cls_model_path = "models/resnet34_brisc2025_classification.pth"

seg_model = load_segmentation_model(path=seg_model_path, device=device)
cls_model = load_classification_model(path=cls_model_path, device=device, num_classes=len(class_names))

# ---------------------------
# Utility: Convert mask to overlay
# ---------------------------
def mask_to_overlay_base64(mask: np.ndarray, original_img: Image.Image):
    if mask.max() != 0:
        mask = mask / mask.max()
    color_map = plt.get_cmap("plasma")
    mask_colored = (color_map(mask)[:, :, :3] * 255).astype(np.uint8)
    orig_resized = original_img.resize((224, 224))
    orig_np = np.array(orig_resized)
    blended = (0.6 * orig_np + 0.4 * mask_colored).astype(np.uint8)
    blended_img = Image.fromarray(blended)
    buffered = io.BytesIO()
    blended_img.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode()

# ---------------------------
# Prediction endpoint
# ---------------------------
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    img = Image.open(file.file).convert("RGB")

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])
    img_tensor = transform(img).unsqueeze(0).to(device)

    seg_model.eval()
    cls_model.eval()
    with torch.no_grad():
        seg_output = seg_model(img_tensor)
        cls_output = cls_model(img_tensor)

    seg_pred = torch.argmax(seg_output.squeeze(), dim=0).cpu().numpy()
    cls_probs = F.softmax(cls_output, dim=1).cpu().numpy().flatten()
    cls_pred = np.argmax(cls_probs)
    confidence = round(float(cls_probs[cls_pred]) * 100, 2)

    cls_name = class_names[cls_pred]
    seg_base64 = mask_to_overlay_base64(seg_pred, img)

    return {
        "classification": cls_name,
        "confidence": confidence,
        "segmentation": seg_base64
    }

import os
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port)
