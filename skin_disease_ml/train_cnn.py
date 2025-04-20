# train_cnn.py

import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau

# Load the preprocessed data
print("[INFO] Loading preprocessed data...")
X_train = np.load('preprocessed_data/X_train.npy')
X_test = np.load('preprocessed_data/X_test.npy')
y_train = np.load('preprocessed_data/y_train.npy')
y_test = np.load('preprocessed_data/y_test.npy')

# Normalize with MobileNetV2 preprocessing
X_train = preprocess_input(X_train)
X_test = preprocess_input(X_test)

# Image data augmentation
datagen = ImageDataGenerator(
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    zoom_range=0.1,
    horizontal_flip=True
)

datagen.fit(X_train)

# Load MobileNetV2 base model
print("[INFO] Building MobileNetV2-based model...")
base_model = MobileNetV2(include_top=False, input_shape=(224, 224, 3), weights='imagenet')
base_model.trainable = False  # Freeze base

# Custom top layers
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.3)(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.2)(x)
predictions = Dense(len(np.unique(y_train)), activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Callbacks
early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
reduce_lr = ReduceLROnPlateau(monitor='val_loss', patience=3, factor=0.2, verbose=1)

# Train
print("[INFO] Training CNN model with MobileNetV2...")
history = model.fit(
    datagen.flow(X_train, y_train, batch_size=16),
    epochs=25,
    validation_data=(X_test, y_test),
    callbacks=[early_stop, reduce_lr],
    verbose=1
)

# Save model
model.save("cnn_model.keras")
print("[INFO] Model saved to cnn_model.keras")

# Final accuracy
train_acc = history.history['accuracy'][-1]
val_acc = history.history['val_accuracy'][-1]
print(f"[INFO] Final Training Accuracy:     {train_acc:.4f}")
print(f"[INFO] Final Validation Accuracy:   {val_acc:.4f}")
