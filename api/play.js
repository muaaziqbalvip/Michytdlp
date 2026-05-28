const axios = require('axios');

const FIREBASE_URL = 'https://ramadan-2385b-default-rtdb.firebaseio.com';
const GITHUB_OWNER = process.env.GH_OWNER;
const GITHUB_REPO = process.env.GH_REPO;
const GITHUB_WORKFLOW = process.env.GH_WORKFLOW || 'yt-dlp-cron.yml';
const GH_PAT = process.env.GH_PAT;

async function triggerGitHubWorkflow(){

    try{

        const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${GITHUB_WORKFLOW}/dispatches`;

        await axios.post(
            url,
            {
                ref: 'main'
            },
            {
                headers:{
                    Authorization:`Bearer ${GH_PAT}`,
                    Accept:'application/vnd.github+json',
                    'Content-Type':'application/json'
                }
            }
        );

        console.log('GitHub Workflow Triggered');

    }catch(error){

        console.error('GitHub Trigger Error:', error.message);

    }

}

module.exports = async (req,res)=>{

    try{

        const response = await axios.get(`${FIREBASE_URL}/live_links.json`);

        const data = response.data;

        if(!data || !data.direct_url){

            return res.status(404).json({
                success:false,
                message:'No stream found'
            });

        }

        const currentTime = Date.now();
        const linkAge = currentTime - data.timestamp;

        const FOUR_HOURS = 4 * 60 * 60 * 1000;

        if(linkAge > FOUR_HOURS){

            triggerGitHubWorkflow();

        }

        res.setHeader('Cache-Control','no-cache, no-store, must-revalidate');
        res.setHeader('Pragma','no-cache');
        res.setHeader('Expires','0');

        return res.redirect(302,data.direct_url);

    }catch(error){

        return res.status(500).json({
            success:false,
            error:error.message
        });

    }

};
