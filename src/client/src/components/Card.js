import {
  Container,
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";

import appStyles from "../jss/auth-card.jss";

const AuthCard = ({ content, icon, title, subTitle, media, actions }) => {
  const classes = appStyles();

  return (
    <Container>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.MainWrapper}
      >
        <Grid item xs={12} md={6} lg={4}>
          <Card variant="elevation">
            <CardHeader
              avatar={<Avatar>{icon}</Avatar>}
              title={title}
              subheader={subTitle}
            />
            {media && (
              <CardMedia
                image={media}
                className={classes.Media}
                title="Register"
              />
            )}
            <CardContent>{content}</CardContent>
            <CardActions>{actions}</CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthCard;
