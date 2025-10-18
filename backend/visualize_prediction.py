import torch
from PIL import Image
import matplotlib.pyplot as plt
import torchvision.transforms as transforms
import numpy as np
from model_utils import load_segmentation_model, load_classification_model

# =========================
# Config
# =========================
device = "cuda" if torch.cuda.is_available() else "cpu"

# 4-class names
class_names = ["glioma", "meningioma", "no_tumor", "pituitary"]

# =========================
# Load models
# =========================
seg_model_path = "models/unet_resnet34_segmentation.pth"
cls_model_path = "models/resnet34_brisc2025_classification.pth"

seg_model = load_segmentation_model(path=seg_model_path, device=device)
cls_model = load_classification_model(path=cls_model_path, device=device, num_classes=len(class_names))

# =========================
# Sample image path
# =========================
sample_image_path = "pit.jpg"  # <-- change this to your image path
img = Image.open(sample_image_path).convert("RGB")

# =========================
# Transforms
# =========================
transform_seg = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

transform_cls = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

img_seg = transform_seg(img).unsqueeze(0).to(device)
img_cls = transform_cls(img).unsqueeze(0).to(device)

# =========================
# Predictions
# =========================
seg_model.eval()
cls_model.eval()

with torch.no_grad():
    seg_output = seg_model(img_seg)
    cls_output = cls_model(img_cls)

# =========================
# Process outputs
# =========================
seg_pred = torch.argmax(seg_output.squeeze(), dim=0).cpu().numpy()
cls_pred = torch.argmax(cls_output, dim=1).item()
pred_class_name = class_names[cls_pred]

# =========================
# Visualization
# =========================
plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.imshow(img)
plt.title("Original Image")
plt.axis("off")

plt.subplot(1, 3, 2)
plt.imshow(seg_pred, cmap="viridis")
plt.title("Predicted Segmentation Mask")
plt.axis("off")

plt.subplot(1, 3, 3)
plt.imshow(img)
plt.title(f"Predicted Tumor Type: {pred_class_name}")
plt.axis("off")

plt.tight_layout()
plt.show()
