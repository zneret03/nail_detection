import keras
from PIL import Image, ImageOps
import numpy as np
from pathlib import Path



class Prediction:

    path = ""

    def __init__(self, path):
        self.path = path

    def predictOutput(self):
        # Disable scientific notation for clarity
        np.set_printoptions(suppress=True)

        # Load the model../input/nail-disease-final-data/nail diseases 11/bluish nail/18.PNG
        model = keras.models.load_model(
             f'{Path().absolute()}\\segmentation\\mod.h5')


        # Create the array of the right shape to feed into the keras model
        # The 'length' or number of images you can put into the array is
        # determined by the first position in the shape tuple, in this case 1.
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

        # Replace this with the path to your image
        image = Image.open(self.path).convert('RGB')
        # resize the image to a 224x224 with the same strategy as in TM2:
        # resizing the image to be at least 224x224 and then cropping from the center

        size = (224, 224)
        image = ImageOps.fit(image, size, Image.ANTIALIAS)

        # turn the image into a numpy array
        image_array = np.asarray(image)

        # display the resized image
        # image.show()

        # Normalize the image
        normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1

        # Load the image into the array
        data[0] = normalized_image_array

        # run the inference
        result = model.predict(data)
        # print(Result)
        itemindex = np.where(result == np.max(result))

        reverse_mapping = ['Aloperia / Areata', "Beau's / Lines", 'Bluish / Nail', 'Clubbing', "Darier's / Disease", 'Eczema',
                           "Half and Half / Nail",
                           'Koilonychia', 'Leukonychia', "Muehrck-e's / lines",
                           'Onycholyci', 'Red / Lunula', 'Splinter / Hemorrhage',
                           "Terry's / Nails", 'White / Nail', 'Yellow / Nail',
                           'Healthy / Nail']
        prediction_name = reverse_mapping[itemindex[1][0]]
        # print(prediction_name)

        # printing result
        itemindex = np.where(result == np.max(result))
        Accuracy = str(np.max(result*100))
        # print("Predicted Symptome is " + prediction_name +
        #       " with an accuracy of: " + Accuracy)

        switcher = {
            "Beau's / Lines": "Diabetes, Coronary thrombosis, Renal failure, Pneumonia",
            "Clubbing": "Inflammatory bowel diease, Chronic Bronchitis, Cirrhosis, Congenital Heart disease, Atrioventricular Malformation",
            "Half and Half / Nail": "Renal disease, HIV, Hemodialysis, Chronic Kidney Disease",
            "Koilonychia": "Iron deficiency (Anemia), Hemochromatosis, Coronary Disease, Hypothyroidism",
            "Leukonychia": "Anemia, Hodgkin's disease, Congestive heart failure, Hypoalbuminemia, Chronic Liver Disease",
            "Muehrck-e's / lines": "Liver Disease, Hypoalbuminemia, Kidney disease, Malnutrition",
            "Red / Lunula": "Collagen vascular disease, Alopcia areata, Cardiac Failure, Chronic Obstructive pulmonary disease, Cirrhosis, Psoriasis, Chronic Utricaria",
            "Splinter / Hemorrhage": "Heart Disease, Ulcer, Endocarditis, Psoriasis, Rheumatoid, arthritis, anemia, Juvenile cirrhosis, Diabetes",
            "Terry's / Nails": "Cirrhosis, Chronic hear failure, Diabetes mellitus, HIV, Malnutrition, Hyperthyroidism",
            "Yellow / Nail": "Lymphoedema, Recurrent pleural effusions, Bronchiectasis, Chronic bronchitis, Rheumatoid arthritis, Diabetes mellitus, liver and kidney problems",
            "Healthy / Nail" : "Your nail is healthy, there is no disease detected :)"
        }

        diseases = switcher.get(prediction_name, "nothing")

        return prediction_name, Accuracy, diseases

# beaus lines
# clubbing
# half and half
# koilonychia
# leukonychia
# Muehrck-e's lines
# red lunula
# splinter
# terrys nail
# yellow nails
