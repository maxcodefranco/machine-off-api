import { IsNotEmpty, IsString } from 'class-validator';

export class AppSubmitCustomFieldResponseInputDto {
  @IsNotEmpty()
  @IsString()
  participantId: string;

  @IsNotEmpty()
  @IsString()
  customFieldId: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export class AppSubmitCustomFieldResponseOutputDto {
  id: string;
}
