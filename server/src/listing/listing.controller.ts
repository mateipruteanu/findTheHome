import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessages } from 'src/messages/error-messages.enum';
import { Messages } from 'src/messages/messages.enum';

@Controller('listing')
@ApiTags('Listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
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
  create(@Body() createListingDto: CreateListingDto) {
    const { posterId, ...userListing } = createListingDto;
    return this.listingService.create(posterId, userListing);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'All listings' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  getAll(@Body() params: any) {
    return this.listingService.getAll(params);
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
  @ApiResponse({ status: HttpStatus.OK, description: Messages.ListingUpdated })
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
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingService.update({ id }, updateListingDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: Messages.ListingDeleted })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.ListingNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  remove(@Param('id') id: string) {
    return this.listingService.remove({ id });
  }
}
