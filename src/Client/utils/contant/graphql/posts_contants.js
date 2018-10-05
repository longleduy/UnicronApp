import gql from 'graphql-tag'

export const GET_LIMITED_POSTS = gql`
     query GetLimitedPosts($limitNumber:Int!){
        getLimitedPosts(limitNumber:$limitNumber){
		author,
		content,
		date,
		time,
		role,
		info{
			count{
				like,
				liked,
				comment,
				view
			},
			first_cmt_author,
			first_comment
		}
	}
    }
`;
export const GET_ALL_POSTS = gql`
     query GetAllPosts{
        getAllPost{
		author,
		content,
		date,
		time,
		role,
		liked,
		info{
			count{
				like,
				comment,
				view
			}
			first_cmt_author,
			first_comment
		}
	}
    }
`;
