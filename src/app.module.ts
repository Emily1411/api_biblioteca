import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'process';
import { LibroModule } from './libro/libro.module';
import { PrestamoModule } from './prestamo/prestamo.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AutorModule } from './autor/autor.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, envFilePath:'.env'}),
            TypeOrmModule.forRootAsync({imports: [ConfigModule], inject: [ConfigService],useFactory: async(Config: ConfigService) => ({
              type: 'mysql', 
              host: Config.get('DB_HOST'), 
              port: Config.get('DB_PORT'), 
              username: Config.get('DB_USER'), 
              password: Config.get('DB_PASSWORD'), 
              database: Config.get('DB_NAME'), 
              entities: [__dirname + '/**/.entitys/*.entity{.ts,.js}'],
              synchronize: true,
            })}),
            LibroModule,
            PrestamoModule,
            UsuarioModule,
            AutorModule],
})
export class AppModule {}
