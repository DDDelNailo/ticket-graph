export type Position = {
  x: number;
  y: number;
};

export type ImageDimensions = {
  width: number;
  height: number;
};

export function normalizedToImage(
  position: Position,
  dimensions: ImageDimensions,
): Position {
  return {
    x: position.x * dimensions.width,
    y: position.y * dimensions.height,
  };
}

export function imageToNormalized(
  position: Position,
  dimensions: ImageDimensions,
): Position {
  return {
    x: position.x / dimensions.width + 0.5,
    y: position.y / dimensions.height + 0.5,
  };
}