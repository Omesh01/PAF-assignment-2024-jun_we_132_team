package com.social.util;

import com.social.model.Like;
import com.social.model.Post;
import com.social.model.User;

public class TweetUtil {
	
	public final static boolean isLikedByReqUser(User reqUser, Post twit) {
		
		for(Like like : twit.getLikes()) {
			if (like.getUser().getId().equals(reqUser.getId())) {
				return true;
			}
		}
		return false;
	}
	
	public final static boolean isRetwitedByReqUser(User reqUser, Post twit) {
		
		for(User user : twit.getRetwitUser()) {
			if (user.getId().equals(reqUser.getId())) {
				return true;
			}
		}
		return false;
	}

}
