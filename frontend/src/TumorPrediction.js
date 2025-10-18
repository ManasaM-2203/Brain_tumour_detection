import React, { useState } from "react";
import axios from "axios";

function TumorPrediction() {
  const [file, setFile] = useState(null);
  const [segmentationUrl, setSegmentationUrl] = useState(null);
  const [classification, setClassification] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/predict/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // The backend should return: { classification: "Glioma", segmentation: <base64> }
      const { classification, segmentation } = response.data;

      setClassification(classification);

      // Convert base64 segmentation to displayable image
      setSegmentationUrl("data:image/png;base64," + segmentation);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Error predicting image.");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Brain Tumor Detection</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" style={{ marginLeft: "1rem" }}>Predict</button>
      </form>

      {loading && <p>Processing...</p>}

      {classification && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Classification: {classification}</h3>
        </div>
      )}

      {segmentationUrl && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Segmentation Output:</h3>
          <img src={segmentationUrl} alt="Segmentation" style={{ maxWidth: "400px" }} />
        </div>
      )}
    </div>
  );
}

export default TumorPrediction;
