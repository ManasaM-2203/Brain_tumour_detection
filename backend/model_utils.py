import torch
import torch.nn as nn
import torchvision.models as models


# ---------------------------
# UNet with ResNet34 encoder
# ---------------------------
class UNetResNet34(nn.Module):
    def __init__(self, num_classes: int = 4):
        super().__init__()
        base_model = models.resnet34(weights=models.ResNet34_Weights.IMAGENET1K_V1)
        self.enc0 = nn.Sequential(*list(base_model.children())[:3])
        self.enc1 = nn.Sequential(*list(base_model.children())[3:5])
        self.enc2 = list(base_model.children())[5]
        self.enc3 = list(base_model.children())[6]
        self.enc4 = list(base_model.children())[7]

        self.up4 = nn.ConvTranspose2d(512, 256, 2, 2)
        self.conv4 = nn.Conv2d(512, 256, 3, padding=1)

        self.up3 = nn.ConvTranspose2d(256, 128, 2, 2)
        self.conv3 = nn.Conv2d(256, 128, 3, padding=1)

        self.up2 = nn.ConvTranspose2d(128, 64, 2, 2)
        self.conv2 = nn.Conv2d(128, 64, 3, padding=1)

        self.up1 = nn.ConvTranspose2d(64, 64, 2, 2)
        self.conv1 = nn.Conv2d(128, 64, 3, padding=1)

        self.up0 = nn.ConvTranspose2d(64, 64, 2, 2)
        self.conv0 = nn.Conv2d(64, 64, 3, padding=1)

        self.out_conv = nn.Conv2d(64, num_classes, 1)
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        e0 = self.enc0(x)
        e1 = self.enc1(e0)
        e2 = self.enc2(e1)
        e3 = self.enc3(e2)
        e4 = self.enc4(e3)

        d4 = self.up4(e4)
        d4 = self.relu(self.conv4(torch.cat([d4, e3], dim=1)))

        d3 = self.up3(d4)
        d3 = self.relu(self.conv3(torch.cat([d3, e2], dim=1)))

        d2 = self.up2(d3)
        d2 = self.relu(self.conv2(torch.cat([d2, e1], dim=1)))

        d1 = self.up1(d2)
        d1 = self.relu(self.conv1(torch.cat([d1, e0], dim=1)))

        d0 = self.up0(d1)
        d0 = self.relu(self.conv0(d0))

        out = self.out_conv(d0)
        return out


# ---------------------------
# Load segmentation model
# ---------------------------
def load_segmentation_model(path: str = "models/unet_resnet34_segmentation.pth",
                            device: str = "cpu") -> UNetResNet34:
    """
    Load segmentation model from state_dict.
    """
    model = UNetResNet34(num_classes=4)
    state_dict = torch.load(path, map_location=device)
    model.load_state_dict(state_dict)
    model.to(device)
    model.eval()
    return model


# ---------------------------
# Load classification model (with mismatch-safe loading)
# ---------------------------
def load_classification_model(path: str = "models/resnet34_brisc2025_classification.pth",
                              device: str = "cpu", num_classes: int = 2) -> nn.Module:
    """
    Load classification model from state_dict (ignores mismatched layers like fc layer).
    """
    # Create model with new classification head
    model = models.resnet34(weights=None)
    model.fc = nn.Linear(model.fc.in_features, num_classes)

    # Load state dict safely
    loaded_state = torch.load(path, map_location=device)
    model_state = model.state_dict()

    # Keep only matching parameters
    filtered_state = {k: v for k, v in loaded_state.items()
                      if k in model_state and v.size() == model_state[k].size()}

    # Update model weights
    model_state.update(filtered_state)
    model.load_state_dict(model_state, strict=False)

    model.to(device)
    model.eval()
    return model


# ---------------------------
# Example usage
# ---------------------------
if __name__ == "__main__":
    device = "cuda" if torch.cuda.is_available() else "cpu"

    try:
        seg_model = load_segmentation_model(device=device)
        cls_model = load_classification_model(device=device, num_classes=2)

        print("Segmentation model loaded successfully!")
        print("Classification model loaded successfully!")
    except Exception as e:
        print("Error loading models:", e)
