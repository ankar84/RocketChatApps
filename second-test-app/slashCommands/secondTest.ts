import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import {
    ISlashCommand, SlashCommandContext,
} from '@rocket.chat/apps-engine/definition/slashcommands';

export class SecondTestCommand implements ISlashCommand {
    public command = 'secondTest';
    public i18nDescription = '';
    public i18nParamsExample = '';
    public permission = '';
    public providesPreview = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        modify.getCreator().finish(modify.getCreator().startMessage().setRoom(context.getRoom()).setText('Second test ✅'));
    }
}
