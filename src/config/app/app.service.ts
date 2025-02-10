import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export type ApiDescriptionType = {
  name: string;
  version: string;
  description: string;
  author: string;
};

@Injectable()
export class AppService {
  showApiDescription(): ApiDescriptionType {
    const packageJsonPath = path.join(__dirname, '../../..', 'package.json');
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      return {
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        author: packageJson.author,
      };
    } catch (error) {
      console.error('Erro ao ler package.json:', error);
      return {
        name: 'Desconhecido',
        version: 'Desconhecida',
        description: 'Desconhecido',
        author: 'Desconhecido',
      };
    }
  }
}
