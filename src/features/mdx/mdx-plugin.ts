import rehypeShiki from '@shikijs/rehype';
import type { PluggableList } from "unified";

const shikPlugin = [
    rehypeShiki,
    {
        theme: 'github-dark',
    }
] satisfies PluggableList[number];

export const rehypePlugin = [shikPlugin] satisfies PluggableList