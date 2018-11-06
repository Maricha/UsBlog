export class CreateCommentInput {
    authorName: string;
    content: string;
    postId: number;
}

export class CreatePostInput {
    title?: string;
    text?: string;
    tagsId?: number[];
    image?: string;
}

export class CreateTagInput {
    name?: string;
}

export class UpdatePostInput {
    id: number;
    title?: string;
    text?: string;
    tagsId?: number[];
    image?: string;
}

export class Comment {
    id?: number;
    authorName?: string;
    content?: string;
}

export abstract class IMutation {
    abstract createComment(createCommentInput?: CreateCommentInput): Comment | Promise<Comment>;

    abstract createPost(createPostInput?: CreatePostInput): Post | Promise<Post>;

    abstract updatePost(updatePostInput?: UpdatePostInput): Post | Promise<Post>;

    abstract createTag(createTagInput?: CreateTagInput): Tag | Promise<Tag>;
}

export class Post {
    id?: number;
    title?: string;
    text?: string;
    comments?: Comment[];
    tags?: Tag[];
    image?: string;
}

export abstract class IQuery {
    abstract getCommentsForPost(id: string): Comment[] | Promise<Comment[]>;

    abstract comment(id: string): Comment | Promise<Comment>;

    abstract post(id: string): Post | Promise<Post>;

    abstract getPosts(): Post[] | Promise<Post[]>;

    abstract updatePost(): Post[] | Promise<Post[]>;

    abstract getTags(): Tag[] | Promise<Tag[]>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract commentAdded(): Comment | Promise<Comment>;

    abstract postCreated(): Post | Promise<Post>;
}

export class Tag {
    id?: number;
    name?: string;
}
