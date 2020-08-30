export class Posts {
  id: number;
  title: { rendered: string };
  content: { rendered: HTMLElement | string };
  link: string;
  date: string;
  slug: string;
}
