import logging
import os
import json
import base64
from http import HTTPStatus
from tkinter import filedialog

import numpy as np
from flask import Flask, jsonify, request

app = Flask(__name__)


def text_to_binary(message):
    """converts the user's inputed message to binary"""
    if isinstance(message) == str:
        return "".join([format(ord(i), "08b") for i in message])
    elif isinstance(message) == bytes or isinstance(message) == np.ndarray:
        return [format(i, "08b") for i in message]
    elif isinstance(message) == int or isinstance(message) == np.uint8:
        return format(message, "08b")
    else:
        raise TypeError("Input type not supported")


def hide_message(image, message):
    """function that hides the message in the image"""
    # calculate the maximum bytes
    n_bytes = image.shape[0] * image.shape[1] * 3 // 8
    print("Maximum bytes to encode : ", n_bytes)

    # cheching if the number of bytes to encode is less then max
    if len(message) > n_bytes:
        raise ValueError("Error: message length is too long for the image")

    message += "####"

    # convert input data to binary
    binary_message = text_to_binary(message)

    data_index = 0
    data_length = len(binary_message)
    for value in image:
        for pixel in value:
            # converting RGB values to binary
            red, green, blue = text_to_binary(pixel)

            # modify the least significant bit
            if data_index < data_length:
                # hide the data into least significant bit of red pixel
                pixel[0] = int(red[:-1] + binary_message[data_index], 2)
                data_index += 1
            if data_index < data_length:
                # hide the data into least significant bit of green pixel
                pixel[1] = int(green[:-1] + binary_message[data_index], 2)
                data_index += 1
            if data_index < data_length:
                # hide the data into least significant bit of blue pixel
                pixel[2] = int(blue[:-1] + binary_message[data_index], 2)
                data_index += 1

            # if all data is encoded, break loop
            if data_index >= data_length:
                break

    return image


def show_message(image):
    """function that pulls the hidden message from the image"""
    binary_message = ""
    for values in image:
        for pixel in values:
            red, green, blue = text_to_binary(pixel)
            # get all the data from the least significant bits of the red, green, and blue pixels
            binary_message += red[-1]
            binary_message += green[-1]
            binary_message += blue[-1]

    # split by 8 bits
    all_bytes = [binary_message[i : i + 8] for i in range(0, len(binary_message), 8)]

    # convert from bits to chars
    decrypted_message = ""

    for byte in all_bytes:
        decrypted_message += chr(int(byte, 2))

        # checking delimeter we put at the end of the original message,
        #  if so we decrypted the whole message
        if decrypted_message[-4:] == "####":
            break

    # backend check to test if done properly
    print("\n\n", decrypted_message, "\n\n")

    return decrypted_message[:-5]  # removing delimeter


def save_file(image):
    """opens the typical save dialog box to save the encrypted image"""
    file = filedialog.asksaveasfile(
        defaultextension=".jpg",
        filetypes=[("JPG", ".jpg"), ("PNG", ".png"), ("PDF", ".pdf")],
    )

    # exception checking when users cancels save
    if file is None:
        return
    file.write(image)
    file.close()


def get_image(image):
    image_data_list = image["file"]["thumbUrl"].split(",", 1)
    base64_image = image_data_list[1]
    base64_image_bytes = base64_image.encode("utf-8")
    decoded_image_data = base64.decodebytes(base64_image_bytes)
    temp_image = open(image["file"]["name"], "wb")
    temp_image.write(decoded_image_data)
    temp_image.close()

def delete_temp_image(image):
    

@app.route("/", methods=["GET", "POST"])
@app.route("/encrypt/encrypt_message", methods=["POST"])
def encrypt_message():
    """Encryption function that is called when button click on the frontend in the encrpyt page"""
    try:
        data = request.json
        image = data.get("image")
        message = data.get("message")
        get_image(image)
    except ValueError as error:
        logging.error(error)
        return str(error), HTTPStatus.BAD_REQUEST


    # encrypted_image = hide_message(image2, message)
    # save_file(encrypted_image)
    return ("Image saved!"), HTTPStatus.OK


@app.route("/decrypt/decrypt_message", methods=["POST"])
def decrypt_message():
    """Decryption function that is called when button click on the frontend in the decrypt page"""
    try:
        data = request.json
        image = data.get("image")
    except ValueError as error:
        logging.error(error)
        return str(error), HTTPStatus.BAD_REQUEST

    text = show_message(image)
    return (jsonify({"message": text}), HTTPStatus.OK)


if __name__ == "__main__":
    app.run(debug=True)
