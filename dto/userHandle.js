/**
 * A data-transfer-object representing the information of a User Handle
 */
export default class UserHandleDTO {
    static convertToDto(user) {
        return {
            userId: user.Id,
            email: user.Email,
        }
    }
}