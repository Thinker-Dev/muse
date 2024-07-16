import { google } from 'googleapis';

class DriveService {
  private static instance: DriveService;
  private drive: any;
  private pageToken: string | null = null;
  private authClient: any;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): DriveService {
    if (!DriveService.instance) {
      DriveService.instance = new DriveService();
    }
    return DriveService.instance;
  }

  public setAuth(authClient: any) {
    this.authClient = authClient;
    this.drive = google.drive({ version: 'v3', auth: authClient });
  }

  public async getStartPageToken() {
    if (!this.pageToken) {
      const startPageTokenResponse = await this.drive.changes.getStartPageToken({
        supportsAllDrives: true
      });
      this.pageToken = startPageTokenResponse.data.startPageToken!;
    }
    return this.pageToken;
  }

  public async watchChanges(channelId: string, startPageToken: string, address: string) {
    const response = await this.drive.changes.watch({
      pageToken: startPageToken,
      supportsAllDrives: true,
      supportsTeamDrives: true,
      requestBody: {
        id: channelId,
        type: 'web_hook',
        address: address,
        kind: 'api#channel',
      },
    });
    this.pageToken = startPageToken
    return response;
  }

  public async getFileMetadata(fileId: string) {
    try {
      const response = await this.drive.files.get({
        fileId,
        fields: 'id, name, mimeType, createdTime, modifiedTime',
      });
      return response.data;
    } catch (error) {
      console.error('Error getting file metadata:', error);
      throw error;
    }
  }

  public async getChanges() {
    const response = await this.drive.changes.list({
      pageToken: this.pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    // Update the page token for the next use
    if (response.data.newStartPageToken) {
      this.pageToken = response.data.newStartPageToken;
    }

    return response.data.changes;
  }
}

export default DriveService;