import { Injectable } from '@angular/core';
import { ELMappingMasterDataResponse } from '../../../core/models/settings/admin-rights.model';
import { AdminRightsResponse } from '../../../data/responses/settings/admin-rights.response';

@Injectable({
  providedIn: 'root',
})
export class AdminRightsUseCase {
  execute(): ELMappingMasterDataResponse {
    return AdminRightsResponse;
  }
}
