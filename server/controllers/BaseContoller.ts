import {NextApiRequest, NextApiResponse} from 'next'
import {NextApiRequestQuery} from "next/dist/next-server/server/api-utils";
import {ApiConnection} from "../ApiConnection";

export class BaseContoller {
    req: NextApiRequest
    res: NextApiResponse
    query: NextApiRequestQuery
    model
    endpoint
    private systemQueriesList = ['method', 'type', 'id']


    private DeleteSystemQueries(queries) {
        let newQueries = {};

        for (let queryKey in queries) {
            if (!this.systemQueriesList.includes(queryKey)) {
                newQueries = {...newQueries, [queryKey]: queries[queryKey]}
            }
        }

        return newQueries;
    }

    private RequireModule(moduleName) {

    }

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.query = this.req.query;
        this.endpoint = this.query.endpoint;
    }

    public SetResponse(data, status) {
        this.res.status(200).json({
            status: status,
            data
        });
    }

    public async GetList(usePagination = false) {
        this.query = this.DeleteSystemQueries(this.query);
        try {
            const result = await ApiConnection.get(this.endpoint, {...this.query});

          /*  if (usePagination) {
                return {data: result.data, pages: result.headers['x-wp-totalpages']};
            }*/

            return  this.SetResponse(result.data, 'ok');
        }

        catch (err) {
            console.log(err)
        }
    }


    public async GetByID(id) {
        try {
            const result = await ApiConnection.get(this.endpoint, {...this.query});
            return  result.data;
        }

        catch (err) {

        }
    }


}
