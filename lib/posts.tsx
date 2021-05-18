import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export const getPosts = async () => {
    const markdownDir = path.join(process.cwd(), 'markdown');
    const fileNames = await fs.readdir(markdownDir);
    const posts = [];
    for (let i = 0; i < fileNames.length; i++) {
        const fileContent = await fs.readFile(path.join(markdownDir, fileNames[i]), 'utf-8');
        const {data: {title, date}} = matter(fileContent);
        posts.push({
            id: fileNames[i].replace(/.md/g, ''),
            title,
            date,
        });
    }
    return posts;
};

