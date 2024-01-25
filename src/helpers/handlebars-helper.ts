import { HelperOptions } from 'handlebars';

export function indexHelper(this: HelperOptions) {
  const context = this.data.root;
  const viewData = context.viewData;
  const page = viewData.page;
  const limit = viewData.limit;
  const index = this.hash.index;

  return page * limit + index + 1;
}
