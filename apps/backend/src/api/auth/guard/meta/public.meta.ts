import { SetMetadata } from '@nestjs/common';

export const IsPublicAPI = 'isPublic';
export const PublicAPI = () => SetMetadata(IsPublicAPI, true);
