import { IAppAccessors, IRead, ILogger } from '@rocket.chat/apps-engine/definition/accessors';
import { FileUploadNotAllowedException } from '@rocket.chat/apps-engine/definition/exceptions';
import { IFileUploadContext } from '@rocket.chat/apps-engine/definition/uploads';

import { thing } from '../models/thing';

export class FileUploadHandler {
    constructor(private logger: ILogger, private accessors: IAppAccessors) {}

    public async run(context: IFileUploadContext): Promise<void> {
        const room = await this.accessors.reader.getRoomReader().getById(context.file.rid);
        const user = await this.accessors.reader.getUserReader().getById(context.file.userId);

        if (!room || !user) {
            return;
        }

        this.logger.log(`new upload in ${ room.displayName } (#${ room.slugifiedName }) by ${ user.name }. the file name is ${ context.file.name }. the test is ${ thing } `);
        if (context.file.type.includes('image')) {
            throw new FileUploadNotAllowedException('Images are not allowed');
        }
    }
}
