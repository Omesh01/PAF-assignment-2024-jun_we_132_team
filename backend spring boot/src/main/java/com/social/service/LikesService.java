package com.social.service;

import java.util.List;

import com.social.exception.LikeException;
import com.social.exception.PostException;
import com.social.exception.UserException;
import com.social.model.Like;
import com.social.model.Post;
import com.social.model.User;

public interface LikesService {
	
	public Like likeTwit(Long twitId, User user) throws UserException, PostException;
	
	public Like unlikeTwit(Long twitId, User user) throws UserException, PostException, LikeException;
	
	public List<Like> getAllLikes(Long twitId) throws PostException;

}
