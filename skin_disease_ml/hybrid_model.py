import os
import tensorflow as tf
import joblib
import numpy as np
import pandas as pd
from PIL import Image

# ✅ Paths
cnn_model_path = "cnn_model.keras"
nlp_model_path = "nlp_model.joblib"
nlp_label_encoder_path = "label_encoder.joblib"
info_csv_path = "nlp_17.csv"  # Contains: Disease Name, Precautions, Suggested Doctor

# ✅ Ensure all necessary files exist
if not os.path.exists(cnn_model_path):
    raise FileNotFoundError(f"❌ CNN model not found at {cnn_model_path}")
if not os.path.exists(nlp_model_path):
    raise FileNotFoundError(f"❌ NLP model not found at {nlp_model_path}")
if not os.path.exists(nlp_label_encoder_path):
    raise FileNotFoundError(f"❌ Label encoder not found at {nlp_label_encoder_path}")
if not os.path.exists(info_csv_path):
    raise FileNotFoundError(f"❌ Info CSV not found at {info_csv_path}")

# ✅ Load models and data
cnn_model = tf.keras.models.load_model(cnn_model_path)
nlp_model = joblib.load(nlp_model_path)
nlp_label_encoder = joblib.load(nlp_label_encoder_path)
df_info = pd.read_csv(info_csv_path)

# ✅ Prediction function
def predict_hybrid(image_path, symptoms_text):
    # --- CNN Prediction ---
    try:
        img = Image.open(image_path).convert("RGB").resize((224, 224))  # ensure 3-channel RGB
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        cnn_pred_probs = cnn_model.predict(img_array, verbose=0)[0]
        cnn_pred_class = np.argmax(cnn_pred_probs)
        cnn_confidence = float(np.max(cnn_pred_probs))
    except Exception as e:
        raise RuntimeError(f"❌ CNN prediction failed: {e}")

    # --- NLP Prediction ---
    try:
        nlp_pred_class = nlp_model.predict([symptoms_text])[0]
    except Exception as e:
        raise RuntimeError(f"❌ NLP prediction failed: {e}")

    # --- Decode predictions
    try:
        cnn_prediction_label = nlp_label_encoder.classes_[cnn_pred_class]
        nlp_prediction_label = nlp_label_encoder.inverse_transform([nlp_pred_class])[0]
    except Exception as e:
        raise RuntimeError(f"❌ Label decoding failed: {e}")

    # --- Decide final prediction
    final_prediction = cnn_prediction_label if cnn_confidence > 0.5 else nlp_prediction_label

    # --- Get additional info
    try:
        info_row = df_info[df_info["Disease Name"] == final_prediction]
        precautions = info_row["Precautions"].values[0] if not info_row.empty else "N/A"
        suggested_doctor = info_row["Suggested Doctor"].values[0] if not info_row.empty else "N/A"
    except Exception as e:
        raise RuntimeError(f"❌ Info CSV lookup failed: {e}")

    # ✅ Return result
    result = {
        "cnn_prediction": cnn_prediction_label,
        "cnn_confidence": round(cnn_confidence, 4),
        "nlp_prediction": nlp_prediction_label,
        "final_prediction": final_prediction,
        "precautions": precautions,
        "suggested_doctor": suggested_doctor
    }

    print("✅ predict_hybrid executed successfully →", result)
    return result

# ✅ Test run
if __name__ == "__main__":
    test_image_path = r"C:\Users\Sampurna\Downloads\Skin disease prediction\Dataset\test\Acne and Rosacea Photos\07PerioralDermEye.jpg"
    test_symptoms = "red rashes and itching around mouth and eyes"

    try:
        result = predict_hybrid(test_image_path, test_symptoms)
        print("\n🩺 Final Prediction:", result["final_prediction"])
        print("📸 CNN Prediction:", result["cnn_prediction"])
        print("📊 CNN Confidence:", result["cnn_confidence"])
        print("📜 NLP Prediction:", result["nlp_prediction"])
        print("✅ Precautions:", result["precautions"])
        print("👨‍⚕️ Suggested Doctor:", result["suggested_doctor"])
    except Exception as e:
        print("❌ Error:", e)
