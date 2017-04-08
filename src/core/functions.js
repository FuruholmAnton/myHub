import routes from '../routes';

export const getRoutesList = function() {
    let rs = routes.props.children.filter((item) => {
      if (!item) return false;
      return item.props.show;
    });

    return rs.map((item) => item.props) || [];
};
