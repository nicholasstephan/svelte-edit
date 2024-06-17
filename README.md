## Development

```
npm run dev
```

## CSS Variables

| Variable          | Default 
| ---               | ---
| --se-dark         | #424242
| --se-accent       | #aaaaaa
| --se-light        | #f0f0f0


## Blocks

### Image

An image. If a `url` is given, that is used. Will all back on `file`. 
Back-end should handle the file upload and set the url.

| Attribute | Description | Type    | Default
| ---       | ---         | ---     | ---
| url       | Image url   | String  | null
| file      | Image file  | File    | ""


### Link

A link. 

| Attribute   | Description | Type    | Default
| ---         | ---         | ---     | ---
| url         | url         | String  | null
| image       | url         | String  | null
| title       | meta title  | String  | ""
| description | meta desc   | String  | ""
 
### Paragraph

HTML text.

### Title

A title with value: 

| Attribute | Description | Type    | Default
| ---       | ---         | ---     | ---
| level     | Title level | String  | h1
| text      | Title html  | String  | ""

