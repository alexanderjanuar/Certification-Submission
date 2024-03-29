# =============================================================================
# PROBLEM C2
#
# Create a classifier for the MNIST Handwritten digit dataset.
# The test will expect it to classify 10 classes.
#
# Don't use lambda layers in your model.
#
# Desired accuracy AND validation_accuracy > 91%
# =============================================================================

import tensorflow as tf


def solution_C2():
    mnist = tf.keras.datasets.mnist

    # NORMALIZE YOUR IMAGE HERE
    (training_images, training_labels), (test_images, test_labels) = mnist.load_data()
    training_images = training_images / 255.0
    test_images = test_images / 255.0

    class myCallback(tf.keras.callbacks.Callback):
        def on_epoch_end(self, epoch, logs={}):
            if (logs.get('accuracy') > 0.91 and logs.get('val_accuracy') > 0.91):
                print("\nAccuracy and Validation Accuracy is more than 91% so cancelling training!")
                self.model.stop_training = True

    callbacks = myCallback()

    # DEFINE YOUR MODEL HERE
    model = tf.keras.Sequential([tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
                                 tf.keras.layers.MaxPooling2D(2, 2),
                                 tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
                                 tf.keras.layers.MaxPooling2D(2, 2),
                                 tf.keras.layers.Flatten(),
                                 tf.keras.layers.Dropout(0.2),
                                 tf.keras.layers.Dense(128, activation='relu'),
                                 tf.keras.layers.Dense(10, activation='softmax')  # 10 classes classification
                                 ])
    # End with 10 Neuron Dense, activated by softmax

    # COMPILE MODEL HERE
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    # TRAIN YOUR MODEL HERE
    model.fit(training_images,
              training_labels,
              validation_data=(test_images, test_labels),
              verbose=2,
              epochs=30,
              callbacks=[callbacks])

    return model


# The code below is to save your model as a .h5 file.
# It will be saved automatically in your Submission folder.
if __name__ == '__main__':
    # DO NOT CHANGE THIS CODE
    model = solution_C2()
    model.save("model_C2.h5")
