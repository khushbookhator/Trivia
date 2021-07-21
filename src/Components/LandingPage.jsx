import { Typography } from '@material-ui/core'
import { Grid, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import styles from "./Landing.module.css"

function LandingPage() {
    return(
        <div className={styles.cont}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <h1>THE ULTIMATE</h1>
                    <h1>TRIVIA</h1>
                    <br/>
                    <p>Do you think you know all about your favourite Tv Show?</p>
                    <p>Test your knowledge with this Quiz.</p>
                </div>
                <div className={styles.bottom}>
                    <Grid  container spacing={8}>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Link className={styles.links} to="/friends">
                                <Paper className={styles.papers}>
                                    <img className={styles.selectors} src="http://cdn.shopify.com/s/files/1/0091/3316/2593/collections/Rachel_To_Monica_-_White_Background_1200x1200.jpg?v=1597146446" alt="friends"/>
                                    <Typography>F.R.I.E.N.D.S.</Typography>
                                </Paper>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Link  className={styles.links} to="/himym">
                                <Paper className={styles.papers}>
                                    <img className={styles.selectors} src="https://fr.web.img4.acsta.net/pictures/18/01/19/01/04/5560874.jpg" alt="himym"/>
                                    <Typography>How I Met Your Mother</Typography>
                                </Paper>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Link className={styles.links} to="/got">
                                <Paper className={styles.papers}>
                                    <img className={styles.selectors} src="https://www.wallpapertip.com/wmimgs/1-12279_4k-ultra-hd-game-thrones-wallpapers-game-of.jpg" alt="got"/>
                                    <Typography>Game Of Thrones</Typography>
                                </Paper>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
           </div>
        </div>
    )
}

export {LandingPage}