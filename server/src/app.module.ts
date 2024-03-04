import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { ListingModule } from './listing/listing.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AddressModule, ListingModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
