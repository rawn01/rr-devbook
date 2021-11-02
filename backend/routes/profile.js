const express = require("express");
const authMiddleware = require("../middleware/auth");
const ProfileModel = require("../models/Profile");
const UserModel = require("../models/User");
const { profileValidation } = require("./validation");

const router = express.Router();

// @@ View current user profile
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const id = req.user.id;

        const profile = await ProfileModel.findOne({ user: id }).populate("user", ["name"]);

        if(!profile) {
            return res.status(400).json({message: "Not found"});
        }
        
        res.json({ profile: profile })
    } catch(ex) {
        res.status(500).json({ message: ex.message })
    }

});

// @@ Create/Update current profile 
router.post("/", authMiddleware, async (req, res) => {
    const validation = profileValidation(req.body);
    debugger;

    if(validation.error) {
        return res.status(400).json({ message: validation.error.details[0].message });
    }

    const { status, skills, company, website, location, bio, github  } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.skills = skills.split(",").map((item) => item.trim());
    profileFields.status = status;

    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(github) profileFields.github = github;

    try {
        let profile = await ProfileModel.findOne({ user: req.user.id });

        // Update
        if(profile) {
            profile = await ProfileModel.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json({ profile: profile });
        }

        // Create
        profile = new ProfileModel(profileFields);
        await profile.save();
        res.json({ profile: profile });

    } catch(ex) {
        console.log(ex);
        return res.status(500).json({ message: "Server error" });
    }
});

// @@ Get ALL profiles
router.get("/", async (req, res) => {
    try {
        const allProfiles = await ProfileModel.find({}).populate("user", ["name"]);

        res.json({ profiles: allProfiles });
    } catch(ex) {
        res.status(500).json({ message: ex.message })
    }

});

// @@ Get single profile
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await ProfileModel.findOne({ user: id }).populate("user", ["name"]);

        if(!profile) {
            return res.status(400).json({ message: "Could not find profile" });
        }

        res.json({ profiles: profile });
    } catch(ex) {
        if(ex.kind === "ObjectId") {
            return res.status(400).json({ message: "Profile not found" });
        }

        res.status(500).json({ message: ex.message })
    }

});

// @@ Delete current user profile
router.delete("/", authMiddleware, async (req, res) => {
    try {
        await ProfileModel.findOneAndRemove({ user: req.user.id });

        await UserModel.findOneAndRemove({ _id: req.user.id });

        res.status(209).json({ data: "User deleted"})
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
});


// DO IT LATER
router.put("/experience", authMiddleware, async (req, res) => {
    try {
        // const validation;

        const { title, company, location, from, to, current, description } = req.body;

        const newExp = {
            title: title,
            company: company,
            location: location,
            from: from,
            to: to,
            current: current,
            description: description
        };

        const profile = await ProfileModel.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();

        res.json({ profile: profile });
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
});

// DO IT LATER
router.delete("/experience/:id", authMiddleware, async (req, res) => {
    try {
        const profile = await ProfileModel.findOne({ user: req.user.id });

        const removeIndex = profile.experience.map((item) => item.id).indexOf(req.params.id)

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.status(204).json({ data: "Removed experience"})
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
});

router.put("/education", authMiddleware, async (req, res) => {
    try {
        // const validation;

        const { school, degree, fieldOfStudy, from, to, description } = req.body;

        const newEd = {
            school: school,
            degree: degree,
            fieldOfStudy: fieldOfStudy,
            from: from,
            to: to,
            description: description
        };

        const profile = await ProfileModel.findOne({ user: req.user.id });
        profile.education.unshift(newEd);
        await profile.save();

        res.json({ profile: profile });
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
});

router.delete("/education/:id", authMiddleware, async (req, res) => {
    try {
        const profile = await ProfileModel.findOne({ user: req.user.id });

        const removeIndex = profile.education.map((item) => item.id).indexOf(req.params.id)

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.status(204).json({ data: "Removed education"})
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
});


router.get("/github/:username", authMiddleware, async (req, res) => {
    try {
        const githubLink = `https://github.com/${req.params.username}`;
        res.status(204).json({ github: githubLink });
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
});


module.exports = router;



// curriculum-item-view--scaled-height-limiter--1j3Pp curriculum-item-view--no-sidebar--L4DBG