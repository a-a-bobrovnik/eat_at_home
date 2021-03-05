import { HttpStatus } from '@nestjs/common';
export class MainController {
    validateResponseData(responseData) {
        if (!responseData.err) {
            responseData.status = HttpStatus.OK
        } else {
            responseData.status = HttpStatus.BAD_REQUEST
        }
        return responseData
    }
}