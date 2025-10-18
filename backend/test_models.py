from model_utils import load_segmentation_model, load_classification_model
import torch

if __name__ == "__main__":
    # Auto-detect device
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")

    try:
        # Load models
        print("Loading segmentation model...")
        seg_model = load_segmentation_model(device=device)
        print("Segmentation model loaded successfully!")

        print("Loading classification model...")
        cls_model = load_classification_model(device=device, num_classes=2)
        print("Classification model loaded successfully!")

        # Optionally test dummy input
        with torch.no_grad():
            dummy = torch.randn(1, 3, 224, 224).to(device)
            seg_out = seg_model(dummy)
            cls_out = cls_model(dummy)

        print(f"Segmentation output shape: {seg_out.shape}")
        print(f"Classification output shape: {cls_out.shape}")

    except Exception as e:
        print("Error loading models:", e)
