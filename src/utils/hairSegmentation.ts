// MediaPipe Hair Segmentation Integration
import {FilesetResolver, ImageSegmenter} from '@mediapipe/tasks-vision';

let hairSegmenter: ImageSegmenter | null = null;

export async function initializeHairSegmentation() {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
  );

  hairSegmenter = await ImageSegmenter.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/image_segmenter/hair_segmenter/float32/latest/hair_segmenter.tflite',
      delegate: 'GPU',
    },
    outputCategoryMask: true,
    outputConfidenceMasks: false,
    runningMode: 'VIDEO',
  });

  return hairSegmenter;
}

export interface HairSegmentationResult {
  mask: Uint8ClampedArray;
  width: number;
  height: number;
  confidence: number;
}

export function segmentHair(
  imageData: ImageData,
  timestamp: number
): HairSegmentationResult | null {
  if (!hairSegmenter) {
    console.error('Hair segmenter not initialized');
    return null;
  }

  try {
    const result = hairSegmenter.segmentForVideo(imageData, timestamp);
    
    if (!result.categoryMask) {
      return null;
    }

    const mask = result.categoryMask.getAsUint8Array();
    const hairMask = new Uint8ClampedArray(mask.length);
    
    for (let i = 0; i < mask.length; i++) {
      hairMask[i] = mask[i] === 1 ? 255 : 0;
    }

    return {
      mask: hairMask,
      width: result.categoryMask.width,
      height: result.categoryMask.height,
      confidence: 0.85,
    };
  } catch (error) {
    console.error('Hair segmentation error:', error);
    return null;
  }
}

export function applyColorToHair(
  originalImage: ImageData,
  hairMask: Uint8ClampedArray,
  colorHex: string,
  blendStrength: number = 0.7
): ImageData {
  const {width, height, data} = originalImage;
  const coloredImage = new ImageData(
    new Uint8ClampedArray(data),
    width,
    height
  );

  const r = parseInt(colorHex.slice(1, 3), 16);
  const g = parseInt(colorHex.slice(3, 5), 16);
  const b = parseInt(colorHex.slice(5, 7), 16);

  for (let i = 0; i < hairMask.length; i++) {
    if (hairMask[i] > 128) {
      const pixelIndex = i * 4;

      const blendedR = Math.min(
        255,
        (coloredImage.data[pixelIndex] * r) / 255
      );
      const blendedG = Math.min(
        255,
        (coloredImage.data[pixelIndex + 1] * g) / 255
      );
      const blendedB = Math.min(
        255,
        (coloredImage.data[pixelIndex + 2] * b) / 255
      );

      coloredImage.data[pixelIndex] =
        coloredImage.data[pixelIndex] * (1 - blendStrength) +
        blendedR * blendStrength;
      coloredImage.data[pixelIndex + 1] =
        coloredImage.data[pixelIndex + 1] * (1 - blendStrength) +
        blendedG * blendStrength;
      coloredImage.data[pixelIndex + 2] =
        coloredImage.data[pixelIndex + 2] * (1 - blendStrength) +
        blendedB * blendStrength;
    }
  }

  return coloredImage;
}
