# =============================================================================
# PROBLEM B2
#
# Build a classifier for the Fashion MNIST dataset.
# The test will expect it to classify 10 classes.
# The input shape should be 28x28 monochrome. Do not resize the data.
# Your input layer should accept (28, 28) as the input shape.
#
# Don't use lambda layers in your model.
#
# Desired accuracy AND validation_accuracy > 83%
# =============================================================================

import tensorflow as tf

class myCallback(tf.keras.callbacks.Callback):
    # Define the correct function signature for on_epoch_end
    def on_epoch_end(self, epoch, logs={}):
        if logs.get('accuracy') > 0.90 and logs.get('val_accuracy') > 0.90:
            print("\nAkurasi > 90%")

            # Stop training once the above condition is met
            self.model.stop_training = True

callbacks = myCallback()

def solution_B2():
    fashion_mnist = tf.keras.datasets.fashion_mnist

    # NORMALIZE YOUR IMAGE HERE
    (train_data, train_labels), (test_data, test_labels) = fashion_mnist.load_data()
    train_data = train_data / 255.0
    test_data = test_data / 255.0

    # DEFINE YOUR MODEL HERE
    model = tf.keras.models.Sequential([
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(512, activation='relu'),
        tf.keras.layers.Dense(10, activation='softmax')
    ])
    # End with 10 Neuron Dense, activated by softmax
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    # COMPILE MODEL HERE
    model.fit(train_data, train_labels,
              epochs=50,
              validation_data=(test_data, test_labels),
              callbacks=callbacks)

    # TRAIN YOUR MODEL HERE

    return model


# The code below is to save your model as a .h5 file.
# It will be saved automatically in your Submission folder.
if __name__ == '__main__':
    # DO NOT CHANGE THIS CODE
    model = solution_B2()
    model.save("model_B2.h5")
