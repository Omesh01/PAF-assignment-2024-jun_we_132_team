package com.social.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.social.exception.LikeException;
import com.social.exception.PostException;
import com.social.exception.UserException;
import com.social.model.Like;
import com.social.model.Post;
import com.social.model.User;
import com.social.repository.LikeRepository;
import com.social.repository.PostRepository;

@Service
public class LikeServiceImplementation implements LikesService {

	private LikeRepository likeRepository;
	private PostService twitService;
	private PostRepository twitRepository;
	
	public LikeServiceImplementation(
			LikeRepository likeRepository,
			PostService twitService,
			PostRepository twitRepository) {
		this.likeRepository=likeRepository;
		this.twitService=twitService;
		this.twitRepository=twitRepository;
	}

	@Override
	public Like likeTwit(Long twitId, User user) throws UserException, PostException {
		
		Like isLikeExist=likeRepository.isLikeExist(user.getId(), twitId);
		
		if(isLikeExist!=null) {
			likeRepository.deleteById(isLikeExist.getId());
			return isLikeExist;
		}
		
		Post twit=twitService.findById(twitId);
		Like like=new Like();
		like.setTwit(twit);
		like.setUser(user);
		
		Like savedLike=likeRepository.save(like);
		
		
		twit.getLikes().add(savedLike);
		twitRepository.save(twit);
		
		return savedLike;
	}

	@Override
	public Like unlikeTwit(Long twitId, User user) throws UserException, PostException, LikeException {
		Like like=likeRepository.findById(twitId).orElseThrow(()->new LikeException("Like Not Found"));
		
		if(like.getUser().getId().equals(user.getId())) {
			throw new UserException("somthing went wrong...");
		}
		
		likeRepository.deleteById(like.getId());
		return like;
	}

	@Override
	public List<Like> getAllLikes(Long twitId) throws PostException {
		Post twit=twitService.findById(twitId);
		
		List<Like> likes=likeRepository.findByTwitId(twit.getId());
		return likes;
	}

}
