import React, { useState } from "react";

function TumorPredictor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [classification, setClassification] = useState("");
  const [confidence, setConfidence] = useState("");
  const [segmentation, setSegmentation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setClassification("");
    setConfidence("");
    setSegmentation("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_URL}/predict/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setClassification(data.classification);
      setConfidence(data.confidence);
      setSegmentation(data.segmentation);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error predicting tumor. Check backend server.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a1628 0%, #1a3a52 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(30deg, rgba(0, 255, 180, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(0, 255, 180, 0.05) 87.5%, rgba(0, 255, 180, 0.05)),
            linear-gradient(150deg, rgba(0, 255, 180, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(0, 255, 180, 0.05) 87.5%, rgba(0, 255, 180, 0.05)),
            linear-gradient(30deg, rgba(0, 255, 180, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(0, 255, 180, 0.05) 87.5%, rgba(0, 255, 180, 0.05)),
            linear-gradient(150deg, rgba(0, 255, 180, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(0, 255, 180, 0.05) 87.5%, rgba(0, 255, 180, 0.05))
          `,
          backgroundSize: "80px 140px",
          backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px",
          zIndex: 0,
        }}
      ></div>

      {/* Navigation */}
      <nav
        style={{
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          gap: "30px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "20px",
            fontWeight: "600",
            color: "#00ffb4",
          }}
        >
          <span
            style={{
              width: "35px",
              height: "35px",
              background: "#00ffb4",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            🧠
          </span>
          Brain Tumor Detector
        </div>

        <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: "15px" }}>
          Home
        </a>
        <a href="#" style={{ color: "#aaa", textDecoration: "none", fontSize: "15px" }}>
          Symptoms
        </a>
        <a href="#" style={{ color: "#aaa", textDecoration: "none", fontSize: "15px" }}>
          Process of detection
        </a>
      </nav>

      {/* Hero Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px 80px",
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ flex: 1, maxWidth: "500px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "700",
              color: "#fff",
              lineHeight: "1.2",
              marginBottom: "40px",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            BRAIN TUMOR
            <br />
            <span style={{ color: "#00ffb4" }}>DETECTION</span>
          </h1>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "relative",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <img
              src="https://www.shutterstock.com/image-photo/hand-holding-human-brain-futuristic-600nw-2481678871.jpg"
              alt="Holographic Brain"
              style={{
                width: "450px",
                height: "auto",
                filter: "drop-shadow(0 0 50px rgba(74, 144, 255, 0.7))",
              }}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500";
              }}
            />
          </div>

          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
          `}</style>
        </div>
      </div>

      {/* Upload Section */}
      <div
        style={{
          background: "#fff",
          padding: "60px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <button
            style={{
              padding: "15px 50px",
              background: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0, 112, 243, 0.3)",
              marginBottom: "50px",
              display: "inline-block",
            }}
          >
            ⭐ PREDICT NOW ⭐
          </button>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <label
              style={{
                padding: "40px 80px",
                border: "3px dashed #0070f3",
                borderRadius: "15px",
                cursor: "pointer",
                background: "#f8f9fa",
                transition: "all 0.3s ease",
                fontSize: "16px",
                color: "#333",
                fontWeight: "500",
              }}
            >
              {selectedFile ? selectedFile.name : "Choose MRI Image to Predict"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>

            <button
              type="submit"
              disabled={loading || !selectedFile}
              style={{
                padding: "15px 50px",
                background: loading || !selectedFile ? "#ccc" : "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "30px",
                fontSize: "18px",
                fontWeight: "600",
                cursor: loading || !selectedFile ? "not-allowed" : "pointer",
                boxShadow:
                  loading || !selectedFile
                    ? "none"
                    : "0 4px 15px rgba(40, 167, 69, 0.3)",
                transition: "all 0.3s ease",
              }}
            >
              {loading ? "⏳ Analyzing..." : "Predict Tumor"}
            </button>
          </form>

          {loading && (
            <p
              style={{
                marginTop: "30px",
                fontSize: "18px",
                color: "#0070f3",
                fontWeight: "500",
              }}
            >
              ⏳ Analyzing MRI image...
            </p>
          )}

          {classification && (
            <div
              style={{
                marginTop: "50px",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                maxWidth: "800px",
                margin: "50px auto",
              }}
            >
              <h3
                style={{
                  fontSize: "32px",
                  marginBottom: "15px",
                  color: "#1a1a1a",
                }}
              >
                Predicted Type:{" "}
                <span
                  style={{
                    color: "#0070f3",
                    fontWeight: "700",
                  }}
                >
                  {classification}
                </span>
              </h3>

              <p
                style={{
                  fontSize: "20px",
                  color: "#555",
                  marginBottom: "30px",
                }}
              >
                Confidence:{" "}
                <strong style={{ color: "#28a745" }}>{confidence}%</strong>
              </p>

              {segmentation && (
                <div style={{ marginTop: "30px" }}>
                  <h4
                    style={{
                      fontSize: "24px",
                      marginBottom: "20px",
                      color: "#1a1a1a",
                    }}
                  >
                    Segmentation Overlay:
                  </h4>
                  <img
                    src={`data:image/png;base64,${segmentation}`}
                    alt="Segmentation Overlay"
                    style={{
                      maxWidth: "100%",
                      borderRadius: "15px",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                      border: "3px solid #0070f3",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#666",
                      marginTop: "15px",
                      fontWeight: "500",
                    }}
                  >
                    🔴 Red/Yellow = Tumor regions
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Info Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "30px",
              marginTop: "60px",
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                background: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  height: "200px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "60px",
                }}
              >
                🧠
              </div>
              <div style={{ padding: "20px" }}>
                <button
                  style={{
                    padding: "10px 20px",
                    border: "2px solid #667eea",
                    background: "transparent",
                    color: "#667eea",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  What is Brain Tumor?
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div
              style={{
                background: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  height: "200px",
                  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "60px",
                }}
              >
                🔬
              </div>
              <div style={{ padding: "20px" }}>
                <button
                  style={{
                    padding: "10px 20px",
                    border: "2px solid #f5576c",
                    background: "transparent",
                    color: "#f5576c",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Brain Tumor & Brain Cancer
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div
              style={{
                background: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  height: "200px",
                  background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "60px",
                }}
              >
                💊
              </div>
              <div style={{ padding: "20px" }}>
                <button
                  style={{
                    padding: "10px 20px",
                    border: "2px solid #00f2fe",
                    background: "transparent",
                    color: "#00a0fe",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Treatment Procedure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TumorPredictor;
