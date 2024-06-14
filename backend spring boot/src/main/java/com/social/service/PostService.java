package com.social.service;

import java.util.List;

import com.social.exception.PostException;
import com.social.exception.UserException;
import com.social.model.Post;
import com.social.model.User;
import com.social.request.PostReplyRequest;
import com.social.request.PostRequest;

public interface PostService {
	
	
	public Post createTwit(Post req,User user)throws UserException, PostException;
	
	public List<Post> findAllTwit();
	
	public Post retwit(Long twitId, User user) throws UserException, PostException;
	
	public Post findById(Long twitId) throws PostException;

	public Post updateTwitByID(Long twitId, Post req, User user) throws PostException, UserException;
	
	public void deleteTwitById(Long twitId,Long userId) throws PostException, UserException;
	
	public Post removeFromRetwit(Long twitId, User user) throws PostException, UserException;
	
	public Post createReply(PostReplyRequest req,User user) throws PostException;
	
	public List<Post> getUsersTwit(User user);
	
	public List<Post> findByLikesContainsUser(User user);

	public Post updateTwitByID(Long twitId, PostRequest req, User user);
	
	

}
