import { Injectable } from '@nestjs/common';
import {
  DetectDocumentTextCommand,
  TextractClient,
} from '@aws-sdk/client-textract';

@Injectable()
export class TextractService {
  getTag(columnPosition) {
    switch (columnPosition) {
      case 1:
        return 'B';
      case 2:
        return 'I';
      case 3:
        return 'N';
      case 4:
        return 'G';
      case 5:
        return 'O';
      default:
        return '';
    }
  }
  async detectDocumentText(image: Express.Multer.File) {
    const client = new TextractClient({ region: 'us-east-1' });
    const params = {
      Document: {
        Bytes: image.buffer,
      },
    };
    const command = new DetectDocumentTextCommand(params);
    const response = await client.send(command);
    console.log(response);

    const matrix = [];
    let elementOfMatrix = [];

    const arrayValues = response.Blocks.map((block) => {
      if (block.BlockType === 'LINE' && !isNaN(Number(block.Text))) {
        return block.Text;
      }
    })
      .join(' ')
      .trim()
      .replace('  ', ' 0 ')
      .replace('  ', ' ')
      .split(' ');

    for (let i = 0; i < arrayValues.length; i++) {
      if (elementOfMatrix.length === 0 || elementOfMatrix.length < 5) {
        elementOfMatrix.push({
          value: arrayValues[i],
          position: `${matrix.length + 1},${elementOfMatrix.length + 1}`,
          tag: this.getTag(elementOfMatrix.length + 1),
        });
      }

      if (elementOfMatrix.length === 5) {
        matrix.push(elementOfMatrix);
        elementOfMatrix = [];
      }
    }

    return matrix;
  }
}
