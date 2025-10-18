🧠 Brain Tumor Detection System
This project is a deep learning–based system that detects and classifies brain tumors from MRI images into four types:
Glioma, Meningioma, Pituitary, and No Tumor.
It uses two specialized neural network models:
🎯 UNet with ResNet34 encoder – for tumor segmentation (locating the tumor region)
🧩 ResNet34 classifier – for tumor type classification

⚙️ Installation
1️⃣ Clone the Repository
    git clone https://github.com/yourusername/brain_tumor_detection.git
    cd brain_tumor_detection

2️⃣ Backend Setup (FastAPI)
      cd backend
      pip install -r requirements.txt
  Start the backend:
      uvicorn app:app --reload

3️⃣ Frontend Setup (React)
      cd ../frontend
      npm install
      npm start




