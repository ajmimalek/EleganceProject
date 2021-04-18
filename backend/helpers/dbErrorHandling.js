"use strict";

/**
 * Get unique error field name
 */

 const uniqueMessage = error => {
    let output;
    try {
        // Split message into words seperated by .$ and get the element of index 1 -> get the name of user
        let fieldName = error.message.split(".$")[1];
        field = field.split(" dup key")[0];
        // get field from the first letter to the last index of _
        field = field.substring(0, field.lastIndexOf("_"));
        req.flash("errors", [{
            msg: "An account with this " + field + " already exists."
        }]);
        // output : first char of the name (majuscule) + the second element of fieldName array.
        output =
            fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1) +
            " already exists";
    } catch (ex) {
        output = "already exists";
    }

    return output;
};

/**
 * Get the errors message from error object
 */
exports.errorHandler = error => {
    let message = "";

    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                // When the msg code is 11001 -> quit the switch.
                message = uniqueMessage(error);
                break;
            default:
                message = "Something went wrong";
        }
    } else {
        //Looking for the message error in errorName
        for (let errorName in error.errors) {
            if (error.errors[errorName].message)
                message = error.errors[errorName].message;
        }
    }

    return message;
};