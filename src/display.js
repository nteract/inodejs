// @flow

export type JSONType =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

export type JSONArray = Array<JSONType>;
export type JSONObject = { [key: string]: JSONType };

type DisplayContent = {
  data: JSONObject,
  metadata: JSONObject,
  transient: { [key: string]: JSONType }
};

function raw_display(o: DisplayContent) {
  // Pretend this is sending it on the iopub socket
  console.log("content: ", o);
}

function display(obj: any, opts = {}) {
  // opts will accept these keys:

  // raw: boolean // obj is expected to be a mimebundle dict
  // metadata: object, raw
  // transient: object, raw
  // display_id: string - if specified, folded into transient

  const data: JSONObject = opts.raw ? obj : { "text/plain": util.inspect(obj) };
  const content: DisplayContent = Object.assign(
    {},
    {
      data,
      metadata: opts.metadata || {},
      transient: opts.transient || {}
    }
  );

  if (opts.display_id) {
    content.transient = Object.assign({}, content.transient, {
      display_id: opts.display_id
    });
  }

  rawDisplay(content);
}

module.exports = display;
