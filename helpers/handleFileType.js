const hanldeFileType = file => {
    const fileTypes = [
        "FOLDER",
        "IMAGE",
        "VIDEO",
        "DOCUMENT",
        "AUDIO",
        "OTHER",
    ];

    const fType = fileTypes
        .filter(type => file.includes(type.toLowerCase()))
        .toString();

    return fType || "OTHER";
};

module.exports = hanldeFileType;
