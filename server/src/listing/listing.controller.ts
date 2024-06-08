import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessages } from 'src/messages/error-messages.enum';
import { Messages } from 'src/messages/messages.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('listing')
@ApiTags('Listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: Messages.ListingCreated,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessages.BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: '.(png|jpeg|jpg)',
          }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Request() req,
  ) {
    const image_key = `listingimages/${req.user.sub}/${Date.now()}-${file.originalname}`;
    const createListingDto: CreateListingDto = JSON.parse(req.body.listing);

    return this.listingService.create(
      req.user.sub,
      createListingDto,
      file.buffer,
      image_key,
    );
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'All listings' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  getAll(@Query() query: any) {
    return this.listingService.getAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: Messages.ListingFound })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.ListingNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  getOne(@Param('id') id: string) {
    return this.listingService.getOne({ id });
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: Messages.ListingUpdated })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessages.BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: ErrorMessages.UserCantEditListing,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.ListingNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    const userId = req.user.sub;
    return this.listingService.update({ id }, userId, updateListingDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: Messages.ListingDeleted })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: ErrorMessages.UserCantDeleteListing,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.ListingNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.listingService.remove({ id }, userId);
  }

  @Post(':id/save')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: Messages.ListingSaved })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessages.BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.ListingNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  saveListing(@Request() req, @Param('id') id: string) {
    return this.listingService.saveListing(req.user.sub, id);
  }

  @Delete(':id/save')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: Messages.ListingUnsaved })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessages.BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.ListingNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  unsaveListing(@Request() req, @Param('id') id: string) {
    return this.listingService.unsaveListing(req.user.sub, id);
  }
}
