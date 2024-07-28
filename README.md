## Development

```
npm run dev
```



## CSS Variables

| Variable          | Default 
| ---               | ---
| --se-accent       | #aaaaaa
| --se-background   | #eeeeee
| --se-dark         | #424242
| --se-light        | #ffffff



## Blocks


### Card

#### Attributes

| Attribute   | Description | Type    | Default
| ---         | ---         | ---     | ---
| image       | Image       | Image   | null
| body        | Body        | String  | ""

#### CSS Classes

| Variable          | Description 
| ---               | ---
| .se-card          | Card
| .se-card__image   | Card image  
| .se-card__body    | Card body  



### Image

An image. If a `url` is given, that is used. Will all back on `file`. 
Back-end should handle the file upload and set the url.

| Attribute | Description | Type    | Default
| ---       | ---         | ---     | ---
| url       | Image url   | String  | null
| file      | Image file  | File    | ""


### Image Grid

An image grid where value is an array of file objects. 

#### CSS Classes

| Variable          | Description 
| ---               | ---
| .se-image-grid    | Image grid
| .se-image-grid__image | Image grid image


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

