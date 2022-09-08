export interface FacebookDataResponse {
    success: boolean;
    data:    UserData;
}

export interface UserData {
    user:  UserClass;
    token: string;
}

export interface UserClass {
    id:      string;
    name:    string;
    email:   string;
    picture: Picture;
}

export interface Picture {
    data: PictureData;
}

export interface PictureData {
    height:        number;
    is_silhouette: boolean;
    url:           string;
    width:         number;
}