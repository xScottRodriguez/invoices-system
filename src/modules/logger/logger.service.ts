import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file'; // Importar el paquete de rotación de archivos

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    const rotateInfoTransport = new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%-info.log', // Archivos de log con nivel 'info'
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    });

    const rotateErrorTransport = new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    });

    const rotateWarnTransport = new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%-warn.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'warn',
    });

    const rotateDebugTransport = new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%-debug.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'debug',
    });

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss', // Formato de la fecha en los logs
        }),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return JSON.stringify({
            timestamp,
            level,
            message,
            ...meta,
          });
        }),
      ),
      transports: [
        rotateInfoTransport, // Transport para logs 'info'
        rotateErrorTransport, // Transport para logs 'error'
        rotateWarnTransport, // Transport para logs 'warn'
        rotateDebugTransport, // Transport para logs 'debug'
      ],
    });
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(), // Colorea la salida en consola
            winston.format.simple(),
          ),
        }),
      );
    }
  }

  log(message: string, meta?: Record<string, unknown>): void {
    this.logger.info(message, meta);
  }

  error(message: string, meta?: Record<string, unknown>): void {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.logger.debug(message, meta);
  }
}
