const Joi = require("joi");

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required().messages({
            "string.base": "Name can only contain alphabets",
            "string.empty": "Name cannot be empty",
            "string.min": "Name needs to be of length greater than 3"
        }),
        email: Joi.string().email().required().messages({
            "string.email": "Please enter a valid email address"
        }),
        password: Joi.string().min(3).required().messages({
            "string.empty": "Password cannot be empty",
            "string.min": "Password needs to be of length greater than 3"
        })
    });
    
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().min(3).required().messages({
            "string.email": "Please enter a valid email address"
        }),
        password: Joi.string().min(3).required().messages({
            "string.empty": "Password cannot be empty",
            "string.min": "Password needs to be of length greater than 3"
        })
    });

    return schema.validate(data);
};

const profileValidation = (data) => {
    const schema = Joi.object({
        status: Joi.string().min(3).required().messages({
            "string.empty": "Status cannot be empty",
            "string.min": "Status needs to be of length greater than 3"
        }),
        skills: Joi.string().min(3).required().messages({
            "string.empty": "Status cannot be empty",
            "string.min": "Skills needs to be of length greater than 3"
        })
    }).unknown();

    return schema.validate(data);
}

const postValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required().messages({
            "string.empty": "Title cannot be empty",
            "string.min": "Title needs to be of length greater than 3"
        }),
        text: Joi.string().min(2).max(50).required().messages({
            "string.empty": "Text cannot be empty",
            "string.min": "Text needs to be of length greater than 3"
        }),
    });

    return schema.validate(data);
};

const commentValidation = (data) => {
    const schema = Joi.object({
        text: Joi.string().min(2).max(50).required().messages({
            "string.empty": "Text cannot be empty",
            "string.min": "Text needs to be of length greater than 3"
        }),
    });

    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.profileValidation = profileValidation;
module.exports.postValidation = postValidation;
module.exports.commentValidation = commentValidation;


