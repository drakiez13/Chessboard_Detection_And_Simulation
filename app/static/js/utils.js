function scalePoint(x, y, w, h, old_width, old_height)
{
    return [x / old_width * w, y / old_height * h];
}

export {scalePoint};