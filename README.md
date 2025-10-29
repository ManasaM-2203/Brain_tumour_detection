<h1 align="center">🧠 Brain Tumor Detection System</h1>

<p align="center">
A deep learning–based system that detects and classifies brain tumors from MRI images into four types: <strong>Glioma</strong>, <strong>Meningioma</strong>, <strong>Pituitary</strong>, and <strong>No Tumor</strong>.
</p>

<h2>🎯 Models Used</h2>
<ul>
  <li><strong>UNet with ResNet34 encoder</strong> – for tumor segmentation (locating the tumor region)</li>
  <li><strong>ResNet34 classifier</strong> – for tumor type classification</li>
</ul>

<h2>⚙️ Installation</h2>

<h3>1️⃣ Clone the Repository</h3>
<pre>
git clone https://github.com/yourusername/brain_tumor_detection.git
cd brain_tumor_detection
</pre>

<h3>2️⃣ Backend Setup (FastAPI)</h3>
<pre>
cd backend
pip install -r requirements.txt
</pre>
<p>Start the backend server:</p>
<pre>
uvicorn app:app --reload
</pre>

<h3>3️⃣ Frontend Setup (React)</h3>
<pre>
cd ../frontend
npm install
npm start
</pre>

<h2>💻 Tech Stack</h2>
<ul>
  <li><strong>Machine Learning & Deep Learning:</strong> PyTorch, torchvision, NumPy, scikit-learn</li>
  <li><strong>Models:</strong> UNet (ResNet34 encoder) for segmentation, ResNet34 for classification</li>
  <li><strong>Backend:</strong> FastAPI, Uvicorn</li>
  <li><strong>Frontend:</strong> React.js, Fetch API</li>
  <li><strong>Other Tools:</strong> Matplotlib, python-multipart</li>
</ul>

<h2>🚀 Usage</h2>
<p>Upload an MRI image via the frontend interface to get:</p>
<ul>
  <li>Predicted tumor type (Glioma, Meningioma, Pituitary, No Tumor)</li>
  <li>Segmentation mask highlighting the tumor region</li>
</ul>
